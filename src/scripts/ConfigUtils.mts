import { axiosRequest } from "#scripts/RequestUtils";
import { getStore, updateStore } from "#scripts/StoreUtils";
import { API_PREFIX } from "#scripts/ConstantUtils";
import type { BMResponseData, ConfigData } from "#types/index";

export async function queryConfigData(): Promise<void> {
  try {
    const { sdk, projectId } = getStore();
    if (!sdk || !projectId) {
      return;
    }
    const requestUrl = `${API_PREFIX}project/sdk-config?id=${projectId}&sdk=${sdk}`;
    const res = await axiosRequest<BMResponseData<ConfigData>>(requestUrl, {
      method: "get",
      timeout: 60 * 1000,
    });
    if (res.code === 200) {
      const configData = res.data;
      updateStore({
        ...configData,
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
