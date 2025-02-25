'use client';
import { useRouter } from 'next/navigation';

export const useFilterNavigation = () => {
   const router = useRouter();

   const navigateWithFilter = (filters: { [key: string]: string }) => {
      const queryString = new URLSearchParams(filters).toString();
      router.push(`/dashboard?${queryString}`);
   };
   return { navigateWithFilter };
};


export const useFilterNavigationAlarms = () => {
   const router = useRouter();
   const navigateWithFilterAlarms = (filters: { [key: string]: string }, baseUrl: string) => {
      const queryString = new URLSearchParams(filters).toString();
      router.push(`/${baseUrl}?${queryString}`);
   }
   return { navigateWithFilterAlarms };
};