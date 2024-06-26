

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TechSelectProps {
  onChange: (value: string) => void;
}

export function Tech_Select({onChange}:TechSelectProps) {


  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="md:w-[180px] w-full" >
        <SelectValue placeholder="Select Technology" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup> 
          <SelectItem value="webdev">webdev</SelectItem>
          <SelectItem value="blockchain">blockchain</SelectItem>
          <SelectItem value="AI">AI</SelectItem>
          <SelectItem value="oops">oops</SelectItem>
          <SelectItem value="new_Tech">new_Tech</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
