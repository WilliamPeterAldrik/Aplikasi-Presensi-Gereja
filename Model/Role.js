module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id_role: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      role_name: DataTypes.STRING(45),
      CREATED_AT: DataTypes.DATE,
      UPDATED_AT: DataTypes.DATE,
    },
    {
      tableName: 'role',
      timestamps: false,        // kolom CREATED_AT/UPDATED_AT diurus DB
    }
  );

  Role.associate = models => {
    Role.hasMany(models.User, { foreignKey: 'id_role' });
  };

  return Role;
};