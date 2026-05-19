{
  pkgs,
  ...
}:

{
  packages = with pkgs; [
  ];

  dotenv.enable = true;

  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
}
