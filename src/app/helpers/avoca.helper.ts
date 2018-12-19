export function createPagination(total, per_page, offset = 0) {
    let page = 1;
    if (offset > 0) {
        page = Math.ceil(total/offset);
    }

    const total_page = Math.ceil(total/per_page);

    return {
        page: page,
        total: total_page,
        per_page: per_page,
    }
}
