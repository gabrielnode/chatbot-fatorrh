import axios from "axios";

interface PostData {
  [key: string]: any;
}

export async function postData(data: PostData) {
  const url = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "";
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error during the API call:", error);
    return null;
  }
}

export async function postLogData(data: PostData) {
  const url = process.env.NEXT_PUBLIC_CHATBOT_API_URL + '' || ''
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error during the API call:', error);
    return null;
  }
}

