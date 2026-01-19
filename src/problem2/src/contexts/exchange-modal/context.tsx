import React, { useState, useCallback } from "react";
import { ExchangeModalContext } from "./context-definition";

interface ExchangeModalProviderProps {
  children: React.ReactNode;
}

export const ExchangeModalProvider = ({
  children,
}: ExchangeModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const openModal = useCallback((currency?: string) => {
    setSelectedCurrency(currency || null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = React.useMemo(
    () => ({ isOpen, selectedCurrency, openModal, closeModal }),
    [isOpen, selectedCurrency, openModal, closeModal]
  );

  return (
    <ExchangeModalContext.Provider value={value}>
      {children}
    </ExchangeModalContext.Provider>
  );
};
