import { Contains, IsEmail, IsFQDN, IsInt, Length, Max, Min } from 'class-validator';

export class Test {
    @Length(10, 20,{
          // 自定义错误信息
          message({targetName, property, value, constraints}) {
              return `${targetName} 类的 ${property} 属性的值 ${value} 不满足约束: ${constraints}`
          }
      })

    title: string;

    @Contains('hello')
    text: string;

    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;

    @IsEmail()
    email: string;

    @IsFQDN()
    site: string;
}
