import "module-alias/register";
import { addAliases } from "module-alias";

addAliases({
  $controllers: `${__dirname}/controllers`,
  $routes: `${__dirname}/routes`,
  $utils: `${__dirname}/utils`,
  $validations: `${__dirname}/validations`,
  $services: `${__dirname}/services`,
  $middlewares: `${__dirname}/middlewares`,
});
