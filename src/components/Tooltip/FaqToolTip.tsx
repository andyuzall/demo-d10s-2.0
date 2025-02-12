'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useRef, useState } from "react"

interface CampaignTooltipProps {
    icon: React.ReactNode
    tooltipText: string
    onClick: () => void
    onMultipleFilterChange: (filterType: string, filterValue: string) => void
    isSelected: boolean
    activeFilter: string
}

export default function FaqTooltip({
    icon,
    tooltipText,
    onClick,
    isSelected,
    onMultipleFilterChange,
    activeFilter
}: CampaignTooltipProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(activeFilter);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


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

    useEffect(() => {
        setSearchValue(activeFilter);
    }, [activeFilter]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onMultipleFilterChange("id", value);
    };

    const clearSearch = () => {
        setSearchValue('');
        onMultipleFilterChange("id", '');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="relative z-50">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                onClick();
                            }}
                            className={`flex justify-between items-center py-2 px-2 rounded-md transition-colors hover:shadow-custom ${isSelected ? 'bg-violetaSecundario' : 'bg-white'
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
            </TooltipProvider>
            {/* Dropdown - Aparece a la derecha */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolut top-0 ml-56 w-40 bg-blanco shadow-custom rounded-md border border-gray-200 p-2"
                >
                    <div className="relative">
                        {/* BUSCADOR DE ATK */}
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Busca tu ID"
                            className="w-full text-left text-violetaSecundario px-2 py-1 rounded font-semibold cursor-pointer pr-8"
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                        {searchValue && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-violetaSecundario"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}