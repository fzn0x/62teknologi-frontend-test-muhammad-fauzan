import hypf from "hypf";

const hypfRequest = hypf.createRequest(import.meta.env.VITE_BASE_URL, {}, true);

export default hypfRequest;
