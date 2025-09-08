import api from "../../services/api";

export async function fetchConflictApi(absenceId: string): Promise<boolean> {
  const res = await api.get(`/conflict/${absenceId}`);
  const data = res.data;

  // data is expected as { conflicts: true | false }
  if (typeof data === "object" && "conflicts" in data) {
    return Boolean(data.conflicts);
  }
  return false;
}
