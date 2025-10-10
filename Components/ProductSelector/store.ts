class UniversalFilterBuilder {
    private data: Record<string, string[]> = {
        plotnost: [],
        dvigatel: [],
        rotary: []
    };

    // Добавить значение
    add(field: keyof typeof this.data, value: string): void {
        if (!this.data[field].includes(value)) {
            this.data[field].push(value);
        }
    }

    // Удалить значение
    remove(field: keyof typeof this.data, value: string): void {
        const index = this.data[field].indexOf(value);
        if (index !== -1) {
            this.data[field].splice(index, 1);
        }
    }

    // Построить результат
    build(): Record<string, { contains: string[] }> {
        const result: Record<string, { contains: string[] }> = {};

        for (const [key, values] of Object.entries(this.data)) {
            if (values.length > 0) {
                result[key] = { contains: [...values] };
            }
        }

        return result;
    }

    // Очистить все
    clear(): void {
        for (const key in this.data) {
            this.data[key as keyof typeof this.data] = [];
        }
    }

    // Очистить конкретное поле
    clearField(field: keyof typeof this.data): void {
        this.data[field] = [];
    }
}

export default UniversalFilterBuilder;