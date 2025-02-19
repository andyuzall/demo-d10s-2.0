'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CampaignTooltipProps {
    icon: React.ReactNode
    tooltipText: string
}

export default function IndicadorToolTip({ icon, tooltipText }: CampaignTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className={`flex justify-between items-center py-2 px-2 rounded-md transition-colors`}>
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