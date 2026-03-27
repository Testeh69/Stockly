export type PopUpProps = {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isModalVisible: boolean;
    id: number;
};


export type HistoriqueItem = {
  id: number;
  Lot: string;
  Reference: string;
  Designation: string;
  Quantite: number;
  timestamp: string;
};
