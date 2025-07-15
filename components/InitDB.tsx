import { databaseMap, databaseName, tableName } from "@/utilitaire/sqlConst";
import { createTable } from "@/utilitaire/sqlOps";
import { useEffect, useState } from "react";

export default function InitDB({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        await createTable({ databaseName, tableName, dataFormat: databaseMap });
        setIsReady(true);
      } catch (e) {
        console.error("Erreur d'init DB", e);
      }
    };
    initDB();
  }, []);

  if (!isReady) return null; // ou un spinner si tu veux

  return <>{children}</>; // n’affiche les enfants que quand c’est prêt
}
