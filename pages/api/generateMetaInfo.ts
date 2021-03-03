import { getLinkPreview } from "link-preview-js";
import { NextApiRequest, NextApiResponse } from "next";

const generateMetaInfo = async (
  req: NextApiRequest & { query: { url: string } },
  res: NextApiResponse
) => {
  const url: string = req.query.url;

  const response = await getLinkPreview(url);

  res.status(200).json(response);
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default generateMetaInfo;
