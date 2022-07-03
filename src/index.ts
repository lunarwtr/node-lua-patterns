import * as ffi from "ffi-napi";
import * as ref from "ref-napi";
import * as StructType from "ref-struct-napi";
import * as path from 'path';
import * as ArrayType from 'ref-array-napi';

const Match_t = StructType({
    sm_nmatch: ref.types.uint,
    sm_match: ArrayType(ref.types.CString, 10)
});
const matchPtr = ref.refType(Match_t);
const errorPtr = ref.refType(ref.types.CString);

function strmatch(value: string, pattern: string): any {
    try {
        const lib = path.resolve(__dirname, '../patterns/libpatterns.so');
        const patternlib = ffi.Library(lib, {
            str_match: [ "int", ["string", "string", matchPtr, errorPtr ]], // matchPtr, stringPtr] ],
            //str_match_retmatch: [ matchPtr, ["string", "string", errorPtr ]],
            //str_match_derp: [ "int", ["string", "string", stringArrayPtr, 'pointer', errorPtr ]],
            str_match_free: [ "void", [ matchPtr ]]
        });

        const m = new Match_t;
        const aoc = ref.alloc(errorPtr);
        const rval = patternlib.str_match(value, pattern, m.ref(), aoc);
        if (rval < 0) {
            console.error(aoc);
        } else {
            const size = m.sm_nmatch;
            m.sm_match.length = size;
            for (let i = 0; i < size; i++) {
                const cur = m.sm_match[i];  
                console.log(cur);
            }
            patternlib.str_match_free(m.ref());
        }
    } catch (error) {
        console.error(error);
    }
}


strmatch("How are you today lunarwtr", "^.+(lunarwtr)$");
//strmatch("How are you today lunarwtr@gmail.com", "^.+[A-Za-z0-9%.]+@[%a%d]+%.[%a%d]+.+$");

console.log('howdy');