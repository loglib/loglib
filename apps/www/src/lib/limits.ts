export function getLimit(plan:string | undefined | null) :number {
    if(plan === 'free'){
        return 2;
    }else {
        // meeans no limit 
        return -1;
    }
}

