'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useRef, useState } from "react"

interface CampaignTooltipProps {
    icon: React.ReactNode
    tooltipText: string
    onClick: () => void
    onMultipleFilterChange: (filterType: string, filterValue: string) => void
    isSelected: boolean
}

interface Producto {
    cliente: string;
    anunciante: string;
    mercado: string;
    formato: string;
}

export default function FilterTooltip({
    icon,
    tooltipText,
    onClick,
    isSelected,
    onMultipleFilterChange,
}: CampaignTooltipProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [clientes, setClientes] = useState<string[]>([]);
    const [anunciantes, setAnunciantes] = useState<string[]>([]);
    const [mercados, setMercados] = useState<string[]>([]);
    const [formatos, setFormatos] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isEmailAdmin, setIsEmailAdmin] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getUniqueValues = (array: Producto[], key: keyof Producto) => {
        return Array.from(new Set(array.map(item => item[key])))
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));
    }
    // Función para cargar los datos
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/sheetData');
            const data = await response.json();

            // Obtener valores únicos
            const uniqueClientes = getUniqueValues(data, 'cliente');
            const uniqueAnunciantes = getUniqueValues(data, 'anunciante');
            const uniqueMercados = getUniqueValues(data, 'mercado');
            const uniqueFormatos = getUniqueValues(data, 'formato');

            setClientes(uniqueClientes);
            setAnunciantes(uniqueAnunciantes);
            setMercados(uniqueMercados);
            setFormatos(uniqueFormatos);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Cargar datos cuando se abre el dropdown
    useEffect(() => {
        if (isOpen && clientes.length === 0 && anunciantes.length === 0 && mercados.length === 0 && formatos.length === 0) {
            fetchData();
        }
    }, [isOpen]);


    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await fetch('/api/get-admin');
                const data = await response.json();
                setIsEmailAdmin(data.isEmailAdmin);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsEmailAdmin(false);
            }
        };
        checkAdminStatus();
    }, []);

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
        <div>
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
                    className="absolute left-16 ml-2 w-48 bg-blanco shadow-custom rounded-md border border-gray-200 p-2 z-50"
                >
                    <div className="relative">

                        {/* CATEGORIA FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("categoria", e.target.value)}
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
                            onChange={(e) => onMultipleFilterChange("sdc", e.target.value)}
                        >
                            <option value="">Tipo de compra</option>
                            <option className="font-bold" value="SDC A">SDC A</option>
                            <option className="font-bold" value="SDC B">SDC B</option>
                            <option className="font-bold" value="SDC E">SDC E</option>
                        </select>
                        {/* OBJETIVO FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("queBuscamos", e.target.value)}
                        >
                            <option value="">Objetivo</option>
                            <option className="font-bold" value="Impresiones">Impresiones</option>
                            <option className="font-bold" value="Clicks">Clicks</option>
                            <option className="font-bold" value="Vistas completas">Vistas completas</option>
                            <option className="font-bold" value="Escuchas completas">Escuchas completas</option>
                        </select>
                        {/* ESCENARIO FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("escenarioCampana", e.target.value)}
                        >
                            <option value="">Escenario</option>
                            <option className="font-bold" value="Escenario 1">Escenario 1</option>
                            <option className="font-bold" value="Escenario 2">Escenario 2</option>
                            <option className="font-bold" value="Escenario 3">Escenario 3</option>
                            <option className="font-bold" value="Escenario 4">Escenario 4</option>
                        </select>
                        {/* INVERSIÓN FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("rangoInversion", e.target.value)}
                        >
                            <option value="">Inversión</option>
                            <option className="font-bold" value="1 a 1000">1 a 1000</option>
                            <option className="font-bold" value="1001 a 5000">1001 a 5000</option>
                            <option className="font-bold" value="5001 a 9999">5001 a 9999</option>
                            <option className="font-bold" value="1000 o +">10000 o +</option>
                        </select>
                        {/* CUMPLIMIENTO FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("filtroCumplimiento", e.target.value)}
                        >
                            <option value="">Situación actual</option>
                            <option className="font-bold" value="Objetivos cumplidos">Objetivos cumplidos</option>
                            <option className="font-bold" value="Cumplio Objetivo">Cumplio Objetivo</option>
                            <option className="font-bold" value="Cumplio Consumo">Cumplio Consumo</option>
                        </select>
                        {/* FORMATO FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("formato", e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">
                                {isLoading ? 'Cargando...' : 'Formato'}
                            </option>
                            {formatos.map((formato) => (
                                <option
                                    key={formato}
                                    value={formato}
                                    className="font-bold"
                                >
                                    {formato}
                                </option>
                            ))}
                        </select>
                        {/* MERCADO FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("mercado", e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">
                                {isLoading ? 'Cargando...' : 'Mercado'}
                            </option>
                            {mercados.map((mercado) => (
                                <option
                                    key={mercado}
                                    value={mercado}
                                    className="font-bold"
                                >
                                    {mercado}
                                </option>
                            ))}
                        </select>
                        {/* CLIENTE FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("cliente", e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">
                                {isLoading ? 'Cargando...' : 'Cliente'}
                            </option>
                            {clientes.map((cliente) => (
                                <option
                                    key={cliente}
                                    value={cliente}
                                    className="font-bold"
                                >
                                    {cliente}
                                </option>
                            ))}
                        </select>
                        {/* ANUNCIANTE FILTER */}
                        <select
                            className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                            onChange={(e) => onMultipleFilterChange("anunciante", e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">
                                {isLoading ? 'Cargando...' : 'Anunciante'}
                            </option>
                            {anunciantes.map((anunciante) => (
                                <option
                                    key={anunciante}
                                    value={anunciante}
                                    className="font-bold"
                                >
                                    {anunciante}
                                </option>
                            ))}
                        </select>
                        {/* TRADER FILTER */}
                        {isEmailAdmin && (
                            <select
                                className="w-full text-left px-2 py-1 rounded text-violetaPrincipal font-semibold cursor-pointer"
                                onChange={(e) => onMultipleFilterChange("trader", e.target.value)}
                            >
                                <option value="">Trader</option>
                                <option className="font-bold" value="Juan">Juan</option>
                                <option className="font-bold" value="Cynthia">Cynthia</option>
                                <option className="font-bold" value="Emmanuel">Emmanuel</option>
                                <option className="font-bold" value="Monica">Monica</option>
                                <option className="font-bold" value="Juan Sebastian">Juan Sebastian</option>
                                <option className="font-bold" value="Dalma">Dalma</option>
                            </select>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}