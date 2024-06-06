interface ProfileOptionsKeys {
  [key: string]: string[];
}

export const profileOptions = {
  "ADMIN APOIO": ["Desempenho", "Clima Organizacional", "Treinamento", "Outros"],
  "Perfil 18 - Selecionador Líder": ["Seleção", "Treinamento", "Desempenho"],
  "ADMIN": ["Desempenho", "Clima Organizacional", "Treinamento", "Outros"],
  "ADMIN HML": ["Desempenho", "Clima Organizacional", "Treinamento", "Outros"],
  "ADMIN - OPERAÇÃO": ["Desempenho", "Clima Organizacional", "Treinamento", "Outros"],
  "Perfil 10 - Diretor": ["Seleção", "Treinamento", "Desempenho"],
  "Perfil 11 - Selecionador": ["Seleção", "Treinamento", "Desempenho"],
  "Perfil 12 - Selecionador Líder": ["Seleção", "Treinamento", "Desempenho"],
  "Perfil 13 - SESMT": ["Outros"],
  "Perfil 14 - SESMT Líder": ["Seleção", "Desempenho"],
  "Perfil 16 - RH Corporativo Master": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 2 - RH Corporativo": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 3 - Gestor Áreas Corporativas": ["Seleção", "Desempenho"],
  "Perfil 4 - Staff Administrativo": ["Seleção", "Desempenho"],
  "Perfil 5.1 - RH Gestor - Empresa": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 5 - RH Gestor - Empresa": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 6 - RH Operacional SR": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 7 - RH Operacional PL": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 8 - RH Operacional JR": ["Desempenho", "Clima Organizacional", "Treinamento", "Seleção"],
  "Perfil 9 - Líder": ["Seleção", "Desempenho"]
};

export function getOptionsForProfiles(profiles: string[]) {
  let combinedOptions = new Set<string>();

  profiles.forEach((profile: keyof ProfileOptionsKeys) => {
    const options = profileOptions[profile as keyof typeof profileOptions];
    if (options) {
      options.forEach((option: string) => combinedOptions.add(option));
    }
  });

  return Array.from(combinedOptions);
}
