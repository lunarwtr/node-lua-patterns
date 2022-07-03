import * as ffi from "ffi-napi";
import * as path from 'path';
import * as ref_array from 'ref-array-di';
import * as ref from "ref-napi";
import * as ref_struct from "ref-struct-di";

const StructType = ref_struct(ref);
const ArrayType = ref_array(ref);
const StringArray = ArrayType(ref.types.CString);
const Match_t = StructType({
    sm_match: StringArray,
    sm_nmatch: ref.types.uint
});
const matchPtr = ref.refType(Match_t);

export function strmatch(value: string, pattern: string): any {

    let matchErr = null;
    const lib = path.join(__dirname, '../patterns/libpatterns');
    const patternlib = ffi.Library(lib, {
        str_match: ["int", ["string", "string", matchPtr, StringArray]],
        str_match_free: ["void", [matchPtr]]
    });

    const m = new Match_t;
    const aoc = new StringArray(1);
    const rval = patternlib.str_match(value, pattern, m.ref(), aoc);
    if (rval < 0) {
        if (aoc[0] != null) {
            matchErr = aoc[0];
        }
    } else {
        let { sm_match, sm_nmatch } = m;
        sm_match.length = sm_nmatch;
        const retVal = sm_match.toArray();
        patternlib.str_match_free(m.ref());
        return retVal;
    }

    if (matchErr) {
        throw new Error(matchErr);
    }

    return [];
}
