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
      editar: "/admin/programa/editar",
      listar: "/admin/programa/listar",
    },
  },
  public: {
    login: "/auth/login",
  },
};
