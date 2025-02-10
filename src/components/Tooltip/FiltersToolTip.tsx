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

export default function FilterTooltip({ icon, tooltipText, onClick, isSelected, onFilterChange }: CampaignTooltipProps) {

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

                    {/* CATEGORIA FILTER */}
                    <select
                        className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("categoria", e.target.value)}
                    >
                        <option value="">Categoría</option>
                        <option className="font-bold" value="1">1</option>
                        <option className="font-bold" value="2">2</option>
                        <option className="font-bold" value="3">3</option>
                        <option className="font-bold" value="4">4</option>
                    </select>
                    {/* TIPO DE COMPRA FILTER */}
                    <select
                        className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("tipoCompra", e.target.value)}
                    >
                        <option value="">Tipo de compra</option>
                        <option className="font-bold" value="SDC A">SDC A</option>
                        <option className="font-bold" value="SDC B">SDC B</option>
                        <option className="font-bold" value="SDC E">SDC E</option>
                    </select>
                    {/* OBJETIVO FILTER */}
                    <select
                        className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("objetivo", e.target.value)}
                    >
                        <option value="">Objetivo</option>
                        <option className="font-bold" value="Impresiones">Impresiones</option>
                        <option className="font-bold" value="Clicks">Clicks</option>
                        <option className="font-bold" value="Vistas completas">Vistas completas</option>
                        <option className="font-bold" value="Escuchas completas">Escuchas completas</option>
                    </select>
                    {/* FORMATO FILTER */}
                    <select
                        className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("formato", e.target.value)}
                    >
                        <option value="">Formato</option>
                        <option className="font-bold" value="YouTube">
                            YouTube
                        </option>
                        <option className="font-bold" value="Push Notification">
                            Push Notification
                        </option>
                        <option className="font-bold" value="Connected TV">
                            Connected TV
                        </option>
                        <option className="font-bold" value="Banners Display">
                            Banners Display
                        </option>
                        <option className="font-bold" value="Video Programático">
                            Video Programático
                        </option>
                        <option className="font-bold" value="Video Rewarded">
                            Video Rewarded
                        </option>
                        <option className="font-bold" value="Rich Media Standard">
                            Rich Media Standard
                        </option>
                        <option className="font-bold" value=" Rich Media Plus">
                            Rich Media Plus
                        </option>
                        <option className="font-bold" value="Tik Tok Business">
                            Tik Tok Business
                        </option>
                        <option className="font-bold" value="Native Standard">
                            Native Standard
                        </option>
                        <option className="font-bold" value="DOOH">
                            DOOH
                        </option>
                        <option className="font-bold" value="Social Plus Display">
                            Social Plus Display
                        </option>
                        <option className="font-bold" value="Display DCO">
                            Display DCO
                        </option>
                        <option className="font-bold" value="Audio Ads">
                            Audio Ads
                        </option>
                        <option className="font-bold" value="Video Plus">
                            Video Plus
                        </option>
                    </select>
                    {/* ESCENARIO FILTER */}
                    <select
                        className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("escenarioCampana", e.target.value)}
                    >
                        <option value="">Escenario</option>
                        <option className="font-bold" value="Escenario 1">Escenario 1</option>
                        <option className="font-bold" value="Escenario 2">Escenario 2</option>
                        <option className="font-bold" value="Escenario 3">Escenario 3</option>
                        <option className="font-bold" value="Escenario 4">Escenario 4</option>
                    </select>
                    {/* MERCADO FILTER */}
                    <select
                        className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                        onChange={(e) => onFilterChange("mercado", e.target.value)}
                    >
                        <option value="">Mercado</option>
                        <option className="font-bold" value="Argentina">Argentina</option>
                        <option className="font-bold" value="Bolivia">Bolivia</option>
                        <option className="font-bold" value="Chile">Chile</option>
                        <option className="font-bold" value="Colombia">Colombia</option>
                        <option className="font-bold" value="Costa Rica">Costa Rica</option>
                        <option className="font-bold" value="Ecuador">Ecuador</option>
                        <option className="font-bold" value="Guatemala">Guatemala</option>
                        <option className="font-bold" value="Honduras">Honduras</option>
                        <option className="font-bold" value="México">México</option>
                        <option className="font-bold" value="Paraguay Grupo">Paraguay Grupo</option>
                        <option className="font-bold" value="Paraguay Fuera de Grupo">Paraguay Fuera de Grupo</option>
                        <option className="font-bold" value="Perú">Perú</option>
                        <option className="font-bold" value="Salvador">Salvador</option>
                        <option className="font-bold" value="Uruguay">Uruguay</option>
                    </select>
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