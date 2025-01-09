'use client'

import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CampaignTooltipProps {
    iconSrc: string
    tooltipText: string
    onClick: () => void
    isSelected: boolean
}

export default function CampaignTooltip({ iconSrc, tooltipText, onClick, isSelected }: CampaignTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onClick}
                        className={`flex justify-between items-center py-2 px-2 rounded-md transition-colors hover:shadow-custom ${
                            isSelected ? 'bg-violetaSecundario' : 'bg-white'
                        }`}>
                        <Image
                            src={iconSrc}
                            alt="icono campaña"
                            width={20}
                            height={20}
                        />
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
    )
}