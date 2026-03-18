
export class TransactionRepository {

    async create(data:any, trx: any) {
        return trx("transactions").insert(data)
    }
}