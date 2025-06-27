
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const leaveTypeSchema = z.object({
  name: z.string().min(1, "Leave type name is required"),
  description: z.string().min(1, "Description is required"),
  maxDays: z.number().min(1, "Maximum days must be at least 1"),
  carryForward: z.boolean(),
  requiresApproval: z.boolean(),
  color: z.string().min(1, "Color is required")
});

type LeaveTypeForm = z.infer<typeof leaveTypeSchema>;

interface LeaveType {
  id: string;
  name: string;
  description: string;
  maxDays: number;
  carryForward: boolean;
  requiresApproval: boolean;
  color: string;
}

interface LeaveTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<LeaveType, 'id'>) => void;
  leaveType?: LeaveType;
  isEdit?: boolean;
}

const LeaveTypeModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  leaveType, 
  isEdit = false 
}: LeaveTypeModalProps) => {
  const { toast } = useToast();

  const form = useForm<LeaveTypeForm>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: leaveType?.name || '',
      description: leaveType?.description || '',
      maxDays: leaveType?.maxDays || 1,
      carryForward: leaveType?.carryForward || false,
      requiresApproval: leaveType?.requiresApproval || true,
      color: leaveType?.color || 'blue'
    }
  });

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' }
  ];

  const handleSubmit = (data: LeaveTypeForm) => {
    // Ensure all required properties are present and properly typed
    const leaveTypeData: Omit<LeaveType, 'id'> = {
      name: data.name,
      description: data.description,
      maxDays: data.maxDays,
      carryForward: data.carryForward,
      requiresApproval: data.requiresApproval,
      color: data.color
    };
    
    onSubmit(leaveTypeData);
    if (!isEdit) {
      form.reset();
    }
    toast({
      title: isEdit ? "Leave Type Updated" : "Leave Type Created",
      description: `${data.name} has been ${isEdit ? 'updated' : 'created'} successfully.`
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {isEdit ? 'Edit Leave Type' : 'Configure Leave Type'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the leave type configuration' : 'Create a new leave type with custom settings'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vacation Leave" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe this leave type..."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Days Per Year</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Theme</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`
                            h-10 rounded-md border-2 flex items-center justify-center text-white text-xs font-medium
                            ${color.class}
                            ${field.value === color.value ? 'border-gray-800' : 'border-gray-300'}
                          `}
                          onClick={() => field.onChange(color.value)}
                        >
                          {color.label}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="carryForward"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Carry Forward</FormLabel>
                      <FormDescription className="text-sm">
                        Allow unused days to carry forward to next year
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiresApproval"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Requires Approval</FormLabel>
                      <FormDescription className="text-sm">
                        Requests need manager approval before confirmation
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? 'Update' : 'Create'} Leave Type
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveTypeModal;
