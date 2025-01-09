'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CampaignTooltipProps {
    icon: React.ReactNode
    tooltipText: string
    onClick: () => void
    isSelected: boolean
}

export default function CampaignTooltip({ icon, tooltipText, onClick, isSelected }: CampaignTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onClick}
                        className={`flex justify-between items-center py-2 px-2 rounded-md transition-colors hover:shadow-custom ${
                            isSelected ? 'bg-violetaSecundario' : 'bg-white'
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
    )
}