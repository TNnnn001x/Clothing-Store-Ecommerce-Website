import { Repository } from 'typeorm';
import { style } from './style.entity';
export declare class StyleService {
    private styleRepository;
    constructor(styleRepository: Repository<style>);
    findall(): Promise<style[]>;
    findOne(StyleID: number): Promise<style>;
    create(Style: style): Promise<style>;
    update(StyleID: number, Style: Partial<style>): Promise<style>;
    remove(StyleID: number): Promise<void>;
}
