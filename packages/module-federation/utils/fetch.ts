import type { RemoteItemDefinition } from "../typings";

export const fetchRemoteModuleOptions = async (remote: RemoteItemDefinition) => {
  const url = remote;
  const response = await fetch(url);
  return await response.json();
}