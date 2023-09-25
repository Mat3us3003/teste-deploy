import _InsertResult from "../types/_InsertResult";
import _ImportResult from "../types/_ImportResult";

class Functions {
    public static importReturn(importValue: any, erro: boolean, error_content: any, importContent: any = {}): _ImportResult {
        return {
            import_values: importValue,
            import_content: importContent,
            error: erro,
            error_content: error_content
        }
    }

    public static insertReturn(insertValue: any, error: boolean, error_content: any, insert_content: any = {}): _InsertResult {
        return {
            insert_values: insertValue,
            error: error,
            error_content: error_content,
            insert_content: insert_content
        }
    }
}

export default Functions;