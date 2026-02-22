import { StyleService } from './style.service';
import { style } from './style.entity';
export declare class StyleController {
    private readonly styleService;
    constructor(styleService: StyleService);
    findAll(): Promise<style[]>;
    findOne(id: string): Promise<style>;
    create(Style: style): Promise<style>;
    update(id: string, Style: style): Promise<style>;
    remove(id: string): Promise<void>;
}
