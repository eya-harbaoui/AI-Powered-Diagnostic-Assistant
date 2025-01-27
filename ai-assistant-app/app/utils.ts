import { Pinecone } from "@pinecone-database/pinecone/dist/pinecone";
import { HfInference } from "@huggingface/inference";
const hf = new HfInference(process.env.HF_TOKEN!);

export async function queryPineconeVectorStore(
  client: Pinecone,
  indexName: string,
  namespace: string,
  searchQuery: string
): Promise<string> {
  const hfOutput = await hf.featureExtraction({
    inputs: searchQuery,
    model: "mixedbread-ai/mxbai-embed-large-v1",
  });
  console.log(hfOutput);
  const queryEmbedding = Array.from(hfOutput);
  const index = client.Index(indexName);
  const queryResponse = await index.namespace(namespace).query({
    topK: 5,
    vector: queryEmbedding as any,
    includeMetadata: true,
    includeValues: false,
  });
  console.log(queryResponse);
  if (queryResponse.matches.length > 0) {
    const concatRetrievals = queryResponse.matches
      .map((match, idx) => {
        return `\n Clinical Finding ${idx + 1}: \n ${match.metadata?.chunk}`;
      })
      .join(`\n\n`);
    console.log(concatRetrievals);
    return concatRetrievals;
  } else {
    return "<no_match>";
  }
}
