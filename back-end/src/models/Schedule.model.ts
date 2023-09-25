import Functions from "../core/Functions";
import AppDataSource from "../dataSource";
import Schedule from "../entities/Schedule";

class ScheduleModel {
    public static async _selectAll(){
        const scheduleRepository = AppDataSource.getRepository(Schedule);

        try{
            const schedules = await scheduleRepository.find();
            return schedules;
        } catch(error){
            return error;
        }
    }
    
    public static async _selectBy(query: object){
        const scheduleRepository = AppDataSource.getRepository(Schedule);

        try{
            const scheduleData = await scheduleRepository.findOneBy(query);
            return scheduleData;
        } catch(error){
            return error;
        }
    }

    public static async _insert(schedule: Schedule) {
        const scheduleRepository = AppDataSource.getRepository(Schedule);
        try {
            const insertScheduleValues = await scheduleRepository.insert(schedule);
            return Functions.insertReturn(insertScheduleValues, false, {});
        } catch (error) {
            return error;
        }
    }

    public static async _update(id: number, columns: object) {
        try {
            const scheduleRepository = AppDataSource.getRepository(Schedule);
            const schedule = await scheduleRepository.findOneBy({
                id_schedule: id
            });
            
            const updateSchedule = await scheduleRepository.update(id, columns);
            return updateSchedule;
        } catch (error) {
            return error;
        }
    }

    public static async _deleteById(id: number) {
        const scheduleRepository = AppDataSource.getRepository(Schedule);
        try {
            const deleteSchedule = await scheduleRepository.delete(id);
            return deleteSchedule;
        } catch (error) {
            return error;
        }
    }
}

export default ScheduleModel;