"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "Blockchain",
    label: "Blockchain",
  },
  {
    value: "AI",
    label: "AI",
  },
  {
    value: "Webdev",
    label: "Webdev",
  },
  {
    value: "New_Tech",
    label: "New_Tech",
  },
  {
    value: "oops",
    label: "oops",
  },
]

interface ComboboxProps {
    sendDataToParent: (data: string) => void;
  }
  

export function Combobox({ sendDataToParent }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status>()



  return (
    <div className="flex items-center space-x-4" >
      <Popover open={open} onOpenChange={setOpen}  >
        <PopoverTrigger asChild>
          <Button variant="default" className="px-3 rounded-lg  justify-start text-sm font-thin">
            {selectedStatus ? <>{selectedStatus.label}</> : <> Select</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value:String) => {
                    
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value)
                      )
                      sendDataToParent(status.value); 
                      setOpen(false)
                     
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
