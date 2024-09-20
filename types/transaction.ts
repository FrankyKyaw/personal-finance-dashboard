export interface Transaction {
  transaction_id: string;
  date: string;
  name: string;
  amount: number;
  category: string[];
  merchant_name: string;
}
