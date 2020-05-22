uint128_t combine_ids(uint64_t const &x, uint64_t const &y)
{
    uint128_t times = 1;
    while (times <= y)
        times *= 10;

    return (x * times) + y;
}

uint64_t gen_uuid(const uint64_t &x, const uint64_t &y)
{
    uint128_t res = combine_ids(x, y);
    return std::hash<uint128_t>{}(res);
}