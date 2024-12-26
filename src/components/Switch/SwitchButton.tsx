"use client"
import { useState } from "react"
import { motion } from "framer-motion"
interface CustomSwitchProps {
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  className?: string
}

export default function SwitchButton({ 
  defaultSelected = false, 
  onChange,
  className = ""
}: CustomSwitchProps) {
  const [isSelected, setIsSelected] = useState(defaultSelected)

  const handleClick = () => {
    const newValue = !isSelected
    setIsSelected(newValue)
    onChange?.(newValue)
  }

  return (
    <div 
      className={`relative w-[140px] h-[32px] border-2 border-grisPrincipal rounded-full cursor-pointer ${className}`}
      onClick={handleClick}
      role="switch"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick()
        }
      }}
    >
      {/* Fondo del switch */}
      <div 
        className={`absolute inset-0 rounded-full transition-colors duration-200 ${
          isSelected ? "bg-gradient-to-r to-[#BB86FC] from-[#6300DC]" : "bg-white"
        }`}
      />
      
      {/* Círculo móvil con texto */}
      <motion.div
        className={`${isSelected ? 
            "absolute top-0.5 left-3 w-[80px] h-[25px] bg-gradient-to-l  to-grisPrincipal from-white text-violetaSecundario rounded-full flex items-center justify-center text-xs font-light shadow-sm" : 
            "absolute top-0.5 left-1 w-[80px] h-[25px] bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white rounded-full flex items-center justify-center text-xs font-light shadow-sm"}`}
        animate={{
          x: isSelected ? 38 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50
        }}
      >
        {isSelected ? "Menos info." : "Más info."}
      </motion.div>
    </div>
  )
}