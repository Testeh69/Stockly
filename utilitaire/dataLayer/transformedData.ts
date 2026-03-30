import { Stock } from "@/utilitaire/struct/interface";
import { getUniteReference } from "@/utilitaire/miscellanous";

export const getEnhancedData = (data: Stock[]) : Record<string, string | number>[]=> {
// This function takes an array of Stock objects and returns an array of enhanced data objects with additional fields for miscellaneous purposes
              const enhancedData = data.map((row) => ({
                Référence: row.Reference ?? "",
                Designation: row.Designation ?? "",
                Etablissement: "AXYLLUS TECHNOLOGIES SARL",
                "Zone de stock": "",
                Emplacement: "",
                Lot: row.Lot ?? "",
                Série: "",
                Tiers: "",
                Affaire: "",
                "Statut Qualité": "",
                Unité: "",
                Qté: "",
                Coefficient: "",
                "Qté comptée": row.Quantite ?? "",
                Validité: "Validé",
                Ecart: "",
                "Unité référence": getUniteReference(row.Lot) ?? "",
                "Qté référence": "",
                "Qté réservée": "",
                "Unité stock": "",
                "Qté stock": "",
                "Coefficient stock": "",
                "Cout unitaire": "",
                "Cout total": "",
                "Cout compté": "",
                "Ecart montant": "",
                "Devise cout": "EUR",
                "Barre Longueur": "",
              }));


    return enhancedData;
}