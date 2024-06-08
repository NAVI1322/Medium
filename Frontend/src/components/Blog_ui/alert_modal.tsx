import { toast } from "sonner"

interface AlertProps {
    title: string;
    description: string;
    label: string;
  }

 export const AlertS = ({ title, description, label }: AlertProps) => {
    toast.success( title, {
      description: description,
      action: {
        label: label,
        onClick: () => console.log('hello'),
      },
    });
  };

  export const AlertE= ({ title, description, label }: AlertProps) => {
    toast.error( title, {
      description: description,
      action: {
        label: label,
        onClick: () => console.log('hello'),
      },
    });
  };