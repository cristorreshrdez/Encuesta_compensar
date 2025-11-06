const API_BASE_URL = "https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com";

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export interface LoginResponse {
  message?: string;
}

export interface RegisterResponse {
  message?: string;
}

export interface SurveyResponse {
  message?: string;
}

export function loginApi(emailOrUsername: string, password: string) {
  return request<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({
      emailOrUser: emailOrUsername,
      password: password,
    }),
  });
}

export function registerApi(data: {
  email: string;
  username: string;
  phone: string;
  password: string;
}) {
  return request<RegisterResponse>("/register", {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      user: data.username,
      phone: data.phone,
      password: data.password,
    }),
  });
}

export function surveyApi(user: string, survey: string) {
  return request<SurveyResponse>("/survey", {
    method: "POST",
    body: JSON.stringify({
      user,
      survey,
    }),
  });
}
