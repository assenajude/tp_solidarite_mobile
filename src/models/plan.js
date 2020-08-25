export default class Plan {
    constructor(id, libelle, description, mensualite, compensation, payementId) {
        this.id = id;
        this.libelle = libelle;
        this.description = description;
        this.mensualite = mensualite;
        this.compensation = compensation;
        this.payementId = payementId;
    }
}