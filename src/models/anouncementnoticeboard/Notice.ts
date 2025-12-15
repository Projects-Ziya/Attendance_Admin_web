export type Notice = {
  id: number;
  title: string;
  date: string;
  content: string;
  department?: string;
  description?: string;
  is_pinned?: boolean;
};
