export const APP_ROUTES = {
  private: {
    user: {
      dashboard: "/",
      cadastrar: "/programa/cadastrar",
      editar: "/programa/editar",
      listar: "/programa/listar",
    },
    admin: {
      dashboard: "/admin",
      cadastrar: "/admin/programa/cadastrar",
      processo: "/admin/programa/processo",
      editar: "/admin/programa/editar",
      listar: "/admin/programa/listar",
    },
  },
  public: {
    login: "/auth/login",
    esqueceuSenha: "/auth/esqueceu-a-senha",
    cadastrar: "/auth/cadastro",
  },
};
