'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useRef, useState } from "react"

interface CampaignTooltipProps {
    icon: React.ReactNode
    tooltipText: string
    onClick: () => void
    onFilterChange: (filterType: string, filterValue: string) => void
    isSelected: boolean
}

export default function FaqTooltip({ icon, tooltipText, onClick, isSelected, onFilterChange }: CampaignTooltipProps) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            onClick();
                        }}
                        className={`relative flex justify-between items-center py-2 px-2 rounded-md transition-colors hover:shadow-custom ${isSelected ? 'bg-violetaSecundario' : 'bg-white'
                            }`}>
                        {icon}
                    </button>
                </TooltipTrigger>
                <TooltipContent
                    className="bg-blanco text-violetaPrincipal font-bold shadow-custom"
                    sideOffset={5}
                    side='right'
                >
                    {tooltipText}
                </TooltipContent>
            </Tooltip>
            {/* Dropdown - Aparece a la derecha */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolut ml-60 w-48 bg-blanco shadow-custom rounded-md border border-gray-200 p-2 z-50"
                >
                    {/* BUSCADOR DE ATK */}
                    <input
                        type="text"
                        placeholder="Buscar por ID"
                        className="w-full text-left text-violetaSecundario px-2 py-1 rounded font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("id", e.target.value)}
                        />
                </div>
            )}
        </TooltipProvider>
    )
}