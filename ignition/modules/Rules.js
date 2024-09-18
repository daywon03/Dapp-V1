const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("RulesModule", (m) => {

  // Déploie le contrat "Rules"
  const rules = m.contract("Exmateria", [], {
  });
  // Retourne une référence au contrat déployé
  return { rules };
  
});
