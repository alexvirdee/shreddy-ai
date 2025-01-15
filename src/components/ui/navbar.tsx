import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    return (
        <Card className="bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl rounded-bl-none rounded-br-none">
            <Link href="/" className="py-2 text-md font-bold">ShreddyAI</Link>
            <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                <li className="text-primary font-medium">
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>

            <div className="flex items-center">
                <div className="flex md:hidden mr-2 items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5 rotate-0 scale-100" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link href="/">Home</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/about">About</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <ThemeToggle />
            </div>
        </Card>
    );
};


export default Navbar;