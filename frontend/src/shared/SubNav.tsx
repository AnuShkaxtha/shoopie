import * as React from "react"
 
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Separator } from "@/components/ui/separator";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]


export const SubNav: React.FC = () => {
    return (
        // <div className="h-[60px] pt-3">
        //     <Separator className="w-[100%] bg-black " />
        //     < NavigationMenu className="w-full mt-2 ">
        //         <NavigationMenuList className="flex justify-between">
        //             <NavigationMenuItem>
        //                 <NavigationMenuTrigger>Women's Clothing</NavigationMenuTrigger>
        //                 <NavigationMenuContent>
        //                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        //                         {components.map((component) => (
        //                             <ListItem
        //                                 key={component.title}
        //                                 title={component.title}
        //                                 href={component.href}
        //                             >
        //                                 {component.description}
        //                             </ListItem>
        //                         ))}
        //                     </ul>
        //                 </NavigationMenuContent>
        //             </NavigationMenuItem>
        //             {/*  */}
        //             <NavigationMenuItem>
        //                 <NavigationMenuTrigger>Men's Clothing</NavigationMenuTrigger>
        //                 <NavigationMenuContent>
        //                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        //                         {components.map((component) => (
        //                             <ListItem
        //                                 key={component.title}
        //                                 title={component.title}
        //                                 href={component.href}
        //                             >
        //                                 {component.description}
        //                             </ListItem>
        //                         ))}
        //                     </ul>
        //                 </NavigationMenuContent>
        //             </NavigationMenuItem>
        //             {/*  */}
        //             <NavigationMenuItem>
        //                 <NavigationMenuTrigger>Kid's Clothing</NavigationMenuTrigger>
        //                 <NavigationMenuContent>
        //                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        //                         {components.map((component) => (
        //                             <ListItem
        //                                 key={component.title}
        //                                 title={component.title}
        //                                 href={component.href}
        //                             >
        //                                 {component.description}
        //                             </ListItem>
        //                         ))}
        //                     </ul>
        //                 </NavigationMenuContent>
        //             </NavigationMenuItem>
        //             {/*  */}
        //             <NavigationMenuItem>
        //                 <NavigationMenuTrigger>Health and Beauty</NavigationMenuTrigger>
        //                 <NavigationMenuContent>
        //                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        //                         {components.map((component) => (
        //                             <ListItem
        //                                 key={component.title}
        //                                 title={component.title}
        //                                 href={component.href}
        //                             >
        //                                 {component.description}
        //                             </ListItem>
        //                         ))}
        //                     </ul>
        //                 </NavigationMenuContent>
        //             </NavigationMenuItem>
        //             {/*  */}
        //             <NavigationMenuItem>
        //                 <NavigationMenuTrigger>Home and Decor</NavigationMenuTrigger>
        //                 <NavigationMenuContent>
        //                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        //                         {components.map((component) => (
        //                             <ListItem
        //                                 key={component.title}
        //                                 title={component.title}
        //                                 href={component.href}
        //                             >
        //                                 {component.description}
        //                             </ListItem>
        //                         ))}
        //                     </ul>
        //                 </NavigationMenuContent>
        //             </NavigationMenuItem>
        //         </NavigationMenuList>
        //     </NavigationMenu>
        // </div>
        <div className="h-[50px] pt-3 " >
      <Separator className="w-full bg-black" />
      {/* small screen
      <ScrollArea className="block w-full whitespace-nowrap md:hidden lg:hidden">
      <NavigationMenu className="w-full mt-1 ">
        <NavigationMenuList className="flex ">
          {["Women's Clothing", "Men's Clothing", "Kid's Clothing", "Health and Beauty", "Home and Decor"].map((category) => (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger className="text-[12px] lg:text-[12px]">{category}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-full gap-3 p-4 sm:w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2 lg:grid-cols-3">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ScrollBar orientation="horizontal" />
      </ScrollArea> */}
      
      {/* large */}
      <NavigationMenu className="w-full mt-1 ">
        <NavigationMenuList className="flex ">
          {["Women's Clothing", "Men's Clothing", "Kid's Clothing", "Health and Beauty", "Home and Decor"].map((category) => (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger className="text-[12px] lg:text-[12px]">{category}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-full gap-3 p-4 sm:w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2 lg:grid-cols-3">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


