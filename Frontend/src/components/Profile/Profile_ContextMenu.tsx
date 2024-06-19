import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { useNavigate } from "react-router-dom"

  
export function ProfileContectMenu()
{

    const navigate = useNavigate();

    return (
 
        <ContextMenuContent>
          <ContextMenuItem onClick={()=>navigate('/profile')}>Profile</ContextMenuItem>
          <ContextMenuItem>LogOut</ContextMenuItem>
        </ContextMenuContent>
      
      )
}