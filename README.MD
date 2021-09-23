# VouchChat Backend

### Create Model & Migration

```bash
npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string
```

### Create Migration Only

```bash
npx sequelize-cli migration:generate --name name_of_your_migration
```

#### Migration

##### Run Migrations

```bash
npx sequelize-cli db:migrate
```

#### Seeder

##### Create Seeder
```bash
npx sequelize-cli seed:generate --name demo-user
```
##### Run Seeder

```bash
npx sequelize-cli db:seed:all
```