{
  pkgs,
  ...
}:

{
  packages = with pkgs; [
  ];

  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
}
