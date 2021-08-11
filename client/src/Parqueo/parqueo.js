export class parqueo{
    async getParqueo(){
        const rawRes = await fetch("http://localhost:3001/spaces");
        const parsedRes = await rawRes.json();
        return parsedRes.results;
    }
}
